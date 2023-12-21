package com.pixzoo.back.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pixzoo.back.model.Administrator;
import com.pixzoo.back.model.Customer;
import com.pixzoo.back.model.CustomerUpdateRequest;
import com.pixzoo.back.repository.CustomerRepository;
import com.pixzoo.back.repository.AdministratorRepository;
import com.pixzoo.back.exceptions.*;
@Service
public class UserService {

    private final CustomerRepository customerRepository;
    private final AdministratorRepository administratorRepository;

    @Autowired
    public UserService(CustomerRepository customerRepository, AdministratorRepository administratorRepository) {
        this.customerRepository = customerRepository;
        this.administratorRepository = administratorRepository;
    }

    public Customer createCustomer(Customer customer) {
        Customer existingCPF = customerRepository.findByCPF(customer.getCPF());
        if (existingCPF != null) {
            throw new ConflictException("409 Conflict: Customer with this CPF already exists");
        }

        Customer existingEmail = customerRepository.findByEmail(customer.getEmail());
        if (existingEmail != null) {
            throw new ConflictException("409 Conflict: Customer with this email already exists");
        }

        return customerRepository.save(customer);
    }


    public Administrator createAdministrator(Administrator administrator) {
        return administratorRepository.save(administrator);
    }
    
    public List<Customer> listAllCustomersWithoutIDAndCPF() {
        List<Customer> customers = customerRepository.findAll();
        return customers.stream()
                .filter(customer -> customer.getCPF() != null)
                .collect(Collectors.toList());
    }
    
    public Customer findCustomerById(Long id) {
        Customer userFound = customerRepository.findById(id).orElse(null);

        if (userFound != null && userFound instanceof Customer && ((Customer) userFound).getCPF() != null) {
            return userFound;
        }

        return null;
    }
    
    public Customer updateCustomer(Long id, CustomerUpdateRequest request) {
        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        existingCustomer.setName(request.getName());
        existingCustomer.setEmail(request.getEmail());
        existingCustomer.setAmountDeposited(request.getAmountDeposited());

        return customerRepository.save(existingCustomer);
    }

    public void deleteCustomer(Long id) {
        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        customerRepository.delete(existingCustomer);
    }

}
