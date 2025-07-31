using IndividualProject.Models;

namespace IndividualProject.Repository.IRepository
{
    public interface ISellerRepository
    {
        public bool SignUp(Seller seller);
        Task<bool> LogInAsync ( string email, string password );
        public Seller GetByMail( string Email );
        bool Delete (int id );
        public Seller GetById( int id ); 
        public bool SignOut();

        Task<Seller> GetByIdAsync( int id );

        Task UpdateAsync( Seller seller );
    }
}
