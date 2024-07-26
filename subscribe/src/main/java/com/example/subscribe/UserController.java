package com.example.subscribe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }



    
    @PostMapping("/{id}/subscribe")
    public UserDto subscribeUser(@PathVariable("id") Long id, @RequestBody UserDto userDto) {
        UserEntity userEntity = userService.subscribeUser(id, userDto.getCardNumber(), userDto.getCardCompany());
        return UserMapper.toDto(userEntity);
    }

    @PostMapping("/{id}/unsubscribe")
    public UserDto unsubscribeUser(@PathVariable("id") Long id) {
        UserEntity userEntity = userService.unsubscribeUser(id);
        return UserMapper.toDto(userEntity);
    }
}
