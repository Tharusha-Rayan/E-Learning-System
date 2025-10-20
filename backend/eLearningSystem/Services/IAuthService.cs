using eLearningSystem.Dtos;

namespace eLearningSystem.Services
{
    public interface IAuthService
    {
        Task<String> RegisterAsync(RegisterDto dto);
        Task<String> LoginAsync(LoginDto dto);
    }
}
