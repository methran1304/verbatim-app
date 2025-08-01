namespace server.Entities.Models
{
	public class RegisterRequestDTO
	{
		public string Username { get; set; } = null!;
		public string EmailAddress { get; set; } = null!;
		public string Password { get; set; } = null!;
	}

	public class LoginRequestDTO
	{
		public string EmailAddressOrUsername { get; set; } = null!;
		public string Password { get; set; } = null!;
	}
}
