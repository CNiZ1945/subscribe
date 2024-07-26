package com.example.subscribe;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String name;
    private boolean subscribed;
    private LocalDate subscriptionStartDate;
    private LocalDate subscriptionEndDate;
    private String cardNumber;
    private String cardCompany;

    public UserEntity toEntity(){
        return UserEntity.builder()
                .id(id)
                .name(name)
                .subscribed(subscribed)
                .subscriptionStartDate(subscriptionStartDate)
                .subscriptionEndDate(subscriptionEndDate)
                .cardNumber(cardNumber)
                .cardCompany(cardCompany)
                .build();
    }

    

}
