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
        public async Task<IActionResult> CreateAccountAsync([FromBody] SellerRegistrationDto registrationDto)
        {
            if(ModelState.IsValid)
            {
                TimeZoneInfo localZone = TimeZoneInfo.FindSystemTimeZoneById("Sri Lanka Standard Time"); // Change to your local time zone
                DateTime localDateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, localZone);

                var seller = _mapper.Map<Seller>(registrationDto);
                PasswordHash ph = new PasswordHash();
                seller.Password = ph.HashPassword(registrationDto.Password);
                seller.CreatedAt = localDateTime;

                var result = _sellerRepository.SignUp(seller);
                if (result)
                {
                    Console.WriteLine("registration success");

                    var emailSubject = "Welcome";
                    var emailMessage = $@"";
                    await _emailService.SendEmailAsync(seller.Email, emailSubject, emailMessage);
                    return CreatedAtAction(nameof(GetAccountById), new { id = seller.Id }, seller);
                }
                else
                {
                    Console.WriteLine("registration failed");
                    return BadRequest(result);
                }
            }
            else
            {
                return BadRequest("ModelError");
            }
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
        public IActionResult Login([FromBody] LoginRequestDto sellerLogin)
        {
            var email = sellerLogin.Email;
            var password = sellerLogin.Password;

            var result = _sellerRepository.LogIn(email, password);
            if (!result)
            {
                return Unauthorized("Invalid email or password");
            }

            var loggedInSeller = _sellerRepository.GetByMail(email);

            if(loggedInSeller.isSuspended)
            {
                return Unauthorized("Account is suspended. Please contact the administrator.");
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
