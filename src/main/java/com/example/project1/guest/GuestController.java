package com.example.project1.guest;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/v1")
@RequiredArgsConstructor
@RestController
public class GuestController {
    public final GuestRepository guestRepository ;


    record NewGuestRequest(
            String fullname,
            String email,
            Integer age
    ){}

    @GetMapping("/guests")
    public List<Guest> findAll(){
        return guestRepository.findAll();
    }

    @PutMapping("/guests/{customerId}")
    public void updateGuest(@PathVariable("customerId") Long id, @RequestBody NewGuestRequest request){
        Guest guest = new Guest();
        guest.setId(id);
        guest.setFullname(request.fullname());
        guest.setEmail(request.email());
        guest.setAge(request.age());
        guestRepository.saveAndFlush(guest);
    }


    @DeleteMapping("/guests/{customerId}")
    public void deleteGuest(@PathVariable("customerId") Long id){
        guestRepository.deleteById(id);
    }

    @PostMapping("/guests")
    public void addCustomer(@RequestBody NewGuestRequest request) {
        Guest guest = new Guest();
        guest.setFullname(request.fullname());
        guest.setEmail(request.email());
        guest.setAge(request.age());
        guestRepository.save(guest);
    }

}
