using IndividualProject.DTO;
using IndividualProject.Services.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IndividualProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly IPasswordService _passwordService;

        public PasswordController(IPasswordService passwordService)
        {
            _passwordService = passwordService;
        }

        [HttpPost("forgot")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequestDto request)
        {
            await _passwordService.SendVerificationCodeAsync(request.Email);
            return Ok("Verification code sent to email.");
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequestDto request)
        {
            var isValid = await _passwordService.VerifyOtpAsync( request.VerificationCode);
            if (!isValid)
                return BadRequest("Invalid verification code.");
            return Ok("OTP verified.");
        }

        [HttpPost("reset")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequestDto request)
        {
            var result = await _passwordService.ResetPasswordAsync(request.NewPassword);
            if (!result)
                return BadRequest("Reset failed. Invalid OTP or email.");
            return Ok("Password reset successful.");
        }
    }

}
