    using StoreManager.BLL.Dtos;
    using StoreManager.DAL.Repository;
    using System.Collections.Generic;
    using System.Linq;

    namespace StoreManager.BLL.Managers
    {
        public class CustomerManager : ICustomerManager
        {
            private readonly ICustomerRepository _customerRepo;

            public CustomerManager(ICustomerRepository customerRepo)
            {
                _customerRepo = customerRepo;
            }

            public IEnumerable<CustomerReadDto> GetAll()
            {
                var customers = _customerRepo.GetAll();

                return customers.Select(c => new CustomerReadDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    PhoneNumber = c.PhoneNumber,

                    OrdersCount = c.Orders != null ? c.Orders.Count : 0,
                    TotalSpent = c.Orders != null ? c.Orders.Sum(o => o.TotalPrice) : 0
                }).ToList();
            }
        }
    }