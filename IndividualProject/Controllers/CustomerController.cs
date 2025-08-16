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
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepo;
        private readonly IConfiguration _config;
        private readonly IEmailService _emailService;

        public CustomerController(ICustomerRepository customerRepo, IConfiguration config, IEmailService emailService)
        {
            _customerRepo = customerRepo;
            _config = config;
            _emailService = emailService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(CustomerRegistrationDto dto)
        {
            var existing = await _customerRepo.GetCustomerByEmailAsync(dto.Email);
            if (existing != null)
                return BadRequest("Email already registered.");

            PasswordHash hash = new PasswordHash();

            TimeZoneInfo localZone = TimeZoneInfo.FindSystemTimeZoneById("Sri Lanka Standard Time");
            DateTime localDateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, localZone);

            var customer = new Customer
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = hash.HashPassword(dto.Password),
                Address = dto.Address,
                City = dto.City,
                Phone = dto.Phone,
                Role = "Customer",
                CreatedAt = localDateTime
            };

            var result = await _customerRepo.RegisterCustomerAsync(customer);
            if (!result)
            {
                Console.WriteLine("Registration Failed");
                return StatusCode(500, "Failed to create customer.");
            }

            Console.WriteLine("Registration Success");

            var emailSubject = "Welcome to Tribalist!";
            var emailMessage = $@"
                <h3>Hello {customer.Name},</h3>
                <p>Thank you for registering as a customer on <strong>Tribalist</strong>!</p>
                <p>We're excited to have you onboard. You can now explore our wide range of handcrafted products and support local artisans.</p>
                <br/>
                <p>– The Tribalist Team</p>";

            await _emailService.SendEmailAsync(customer.Email, emailSubject, emailMessage);

            return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginRequestDto dto)
        {
            var isValid = await _customerRepo.LoginCustomerAsync(dto.Email, dto.Password);
            if (!isValid) return Unauthorized("Invalid credentials.");

            var customer = await _customerRepo.GetCustomerByEmailAsync(dto.Email);
            if (customer == null)
                return Unauthorized("User not found.");

            if (customer.Role != "Customer")
                return Unauthorized("Access denied: Not a customer account.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: new[]
                {
            new Claim(ClaimTypes.NameIdentifier, customer.Id.ToString()),
            new Claim(ClaimTypes.Email, customer.Email),
            new Claim(ClaimTypes.GivenName, customer.Name),
            new Claim(ClaimTypes.Role, "Customer")
                },
                expires: DateTime.UtcNow.AddDays(30),
                signingCredentials: creds);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                customer.Id
            });
        }


        [HttpGet("Details/{id}")]
        public async Task<IActionResult> GetCustomer(int id)
        {
            var customer = await _customerRepo.GetByIdAsync(id);
            if (customer == null) return NotFound();

            return Ok(customer);
        }
    }

}
