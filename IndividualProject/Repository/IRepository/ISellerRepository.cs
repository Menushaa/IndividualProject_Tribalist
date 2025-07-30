using IndividualProject.Models;

namespace IndividualProject.Repository.IRepository
{
    public interface ISellerRepository
    {
        public bool SignUp(Seller seller);
        public bool LogIn( string Email, string Password );
        public Seller GetByMail( string Email );
        bool Delete (int id );
        public Seller GetById( int id ); 
        public bool SignOut();

        Task<Seller> GetByIdAsync( int id );

        Task UpdateAsync( Seller seller );
    }
}
