using IndividualProject.Models;

namespace IndividualProject.Repository.IRepository
{
    public interface ICustomerRepository
    {
        Task<bool> RegisterCustomerAsync(Customer customer);
        Task<Customer> GetCustomerByEmailAsync(string email);
        Task<bool> LoginCustomerAsync(string email, string password);
        Task<Customer> GetByIdAsync(int id);
        Task UpdateAsync(Customer cusomer);


    }
}
