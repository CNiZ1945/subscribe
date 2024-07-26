package com.example.subscribe;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private boolean subscribed;
    private LocalDate subscriptionStartDate;
    private LocalDate subscriptionEndDate;
    private String cardNumber;
    private String cardCompany;



    @Builder
    public UserEntity (
        Long id, String name, boolean subscribed, 
        LocalDate subscriptionEndDate, LocalDate subscriptionStartDate, 
        String cardNumber, String cardCompany
        ){
        this.id = id;
        this.name = name;
        this.subscribed = subscribed;
        this.subscriptionStartDate = subscriptionStartDate;
        this.subscriptionEndDate = subscriptionEndDate;
        this.cardNumber = cardNumber;
        this.cardCompany = cardCompany;
        
    }



}
