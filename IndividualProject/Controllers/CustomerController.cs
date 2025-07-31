using IndividualProject.DTO;
using IndividualProject.Models;
using IndividualProject.Repository.IRepository;
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

        public CustomerController(ICustomerRepository customerRepo, IConfiguration config)
        {
            _customerRepo = customerRepo;
            _config = config;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(CustomerRegistrationDto dto)
        {
            var existing = await _customerRepo.GetCustomerByEmailAsync(dto.Email);
            if (existing != null) return BadRequest("Email already registered.");

            PasswordHash hash = new PasswordHash();
            var customer = new Customer
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = hash.HashPassword(dto.Password),
                Address = dto.Address,
                City = dto.City,
                Phone = dto.Phone,
                Role = "Customer"
            };

            await _customerRepo.RegisterCustomerAsync(customer);
            return Ok("Registration successful.");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginRequestDto dto)
        {
            var isValid = await _customerRepo.LoginCustomerAsync(dto.Email, dto.Password);
            if (!isValid) return Unauthorized("Invalid credentials.");

            var customer = await _customerRepo.GetCustomerByEmailAsync(dto.Email);

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

            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token), customer.Id });
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
