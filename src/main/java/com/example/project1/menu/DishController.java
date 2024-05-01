package com.example.project1.menu;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/v1")
@RequiredArgsConstructor
@RestController
public class DishController {
    public final DishRepository dishRepository ;

    record NewDishRequest(
            String name,
            String description,
            String category,
            Integer price,
            byte[] image
    ){}

    @GetMapping("/menu")
    public List<Dish> findAll(){
        return dishRepository.findAll();
    }

    @PutMapping("/menu/secured/{dishId}")
    public void updateDish(@PathVariable("dishId") Long id, @RequestBody NewDishRequest request){
        Dish dish = new Dish();
        dish.setId(id);
        dish.setName(request.name());
        dish.setDescription(request.description());
        dish.setCategory(request.category());
        dish.setPrice(request.price());
        dish.setImage(request.image());
        dishRepository.saveAndFlush(dish);
    }


    @DeleteMapping("/menu/secured/{dishId}")
    public void deleteDish(@PathVariable("dishId") Long id){
        dishRepository.deleteById(id);
    }

    @PostMapping("/menu/secured")
    public void addDish(@RequestBody NewDishRequest request) {
        Dish dish = new Dish();
        dish.setName(request.name());
        dish.setDescription(request.description());
        dish.setCategory(request.category());
        dish.setPrice(request.price());
        dish.setImage(request.image());
        dishRepository.save(dish);
    }
}
