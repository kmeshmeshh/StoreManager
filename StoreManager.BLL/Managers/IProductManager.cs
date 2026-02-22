using StoreManager.BLL.Dtos;
using StoreManager.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreManager.BLL.Managers
{
    public interface IProductManager
    {
        IEnumerable<ProductReadDto> GetAll();
        ProductReadDto GetById(int id);
        ProductReadDto GetByCode(string code);
        void Update(ProductUpdateDto product);
        string? Add(ProductAddDto product);
        void Delete(int Id);
    }
}
