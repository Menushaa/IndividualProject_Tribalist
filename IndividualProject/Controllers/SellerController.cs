using AutoMapper;
using IndividualProject.DTO;
using IndividualProject.Models;
using IndividualProject.Repository.IRepository;
using IndividualProject.Services.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace IndividualProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellerController : ControllerBase
    {
        ISellerRepository _sellerRepository;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public SellerController(ISellerRepository sellerRepository, IConfiguration config,IMapper mapper, IEmailService emailService)
        {
            _sellerRepository = sellerRepository;
            _config = config;
            _mapper = mapper;
            _emailService = emailService;
        }
        [HttpPost("Create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateAccountAsync([FromBody] SellerRegistrationDto registrationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingSeller = _sellerRepository.GetByMail(registrationDto.Email);
            if (existingSeller != null)
            {
                return Conflict("Email is already registered.");
            }
            TimeZoneInfo localZone = TimeZoneInfo.FindSystemTimeZoneById("Sri Lanka Standard Time");
            DateTime localDateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, localZone);

            var seller = _mapper.Map<Seller>(registrationDto);
            PasswordHash ph = new PasswordHash();
            seller.Password = ph.HashPassword(registrationDto.Password);
            seller.CreatedAt = localDateTime;
            seller.Role = "Seller"; 

            var result = _sellerRepository.SignUp(seller);
            if (!result)
            {
                Console.WriteLine("registration failed");
                return StatusCode(500, "Failed to create seller.");
            }

            Console.WriteLine("registration success");

            var emailSubject = "Welcome to Tribalist!";
            var emailMessage = $@"
                <h3>Hello {seller.Name},</h3>
                <p>Thank you for registering as a seller on <strong>Tribalist</strong>!</p>
                <p>We're excited to have you onboard. Start listing your unique handicrafts and grow your business.</p>
                <br/>
                <p>– The Tribalist Team</p>";

            await _emailService.SendEmailAsync(seller.Email, emailSubject, emailMessage);
            return CreatedAtAction(nameof(GetAccountById), new { id = seller.Id }, seller);
        }



        [HttpGet("Details/{id}")]
        public IActionResult GetAccountById(int id)
        {
            var seller = _sellerRepository.GetById(id);
            if (seller == null)
            {
                return NotFound();
            }
            return Ok(seller);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto sellerLogin)
        {
            var email = sellerLogin.Email;
            var password = sellerLogin.Password;

            var result = await _sellerRepository.LogInAsync(email, password); 
            if (!result)
            {
                return Unauthorized("Invalid email or password");
            }

            var loggedInSeller = _sellerRepository.GetByMail(email);

            if(loggedInSeller.Role != "Seller")
            {
                return Unauthorized("Access denied: Not a seller account.");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, email),
                    new Claim(ClaimTypes.NameIdentifier, loggedInSeller.Id.ToString()),
                    new Claim(ClaimTypes.GivenName, loggedInSeller.Name),
                    new Claim(ClaimTypes.Role, "Seller")
                }),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {token = tokenHandler.WriteToken(token), loggedInSeller.Id});
        }

        [HttpPut("ProfileUpdate{id}")]
        public async Task<IActionResult> UpdateSeller(int id, [FromBody] UpdateSellerDto updateSellerDto)
        {
            if (id != updateSellerDto.Id)
            {
                return BadRequest();
            }
            var seller = await _sellerRepository.GetByIdAsync(id);

            if (seller == null)
            {
                return NotFound();
            }

            seller.Name = updateSellerDto.Name;
            seller.Email = updateSellerDto.Email;
            seller.Address = updateSellerDto.Address;
            seller.phoneNumber = updateSellerDto.phoneNumber;

            if(!string.IsNullOrEmpty(updateSellerDto.ProfileUrl))
            {
                seller.ProfileUrl = updateSellerDto.ProfileUrl;
            }

            await _sellerRepository.UpdateAsync(seller);

            return NoContent();
        }



    }
}
