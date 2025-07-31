namespace IndividualProject.DTO
{
    public class ResetPasswordRequestDto
    {
        public string Email { get; set; }
        public string VerificationCode { get; set; }
        public string NewPassword { get; set; }
    }
}
