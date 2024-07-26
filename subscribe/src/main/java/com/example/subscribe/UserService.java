package com.example.subscribe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void init() {
        // 데이터가 존재하지 않을 경우에만 더미 데이터 추가
        if (userRepository.count() == 0) {
            userRepository.saveAll(List.of(
                    UserEntity.builder()
                            .name("홍길동")
                            .subscribed(false)
                            .build(),
                    UserEntity.builder()
                            .name("애쉬")
                            .subscribed(false)
                            .build(),
                    UserEntity.builder()
                            .name("블라디미르")
                            .subscribed(false)
                            .build()
            ));
        }
    }

    public UserEntity subscribeUser(Long id, String cardNumber, String cardCompany) {
        UserEntity user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));


        // 현재 날짜를 구독 시작일로 설정
        LocalDate today = LocalDate.now();
        // 구독 종료일을 1개월 후로 설정
        LocalDate oneMonthLater = today.plusMonths(1);

        user.setCardNumber(cardNumber);
        user.setSubscribed(true);
        user.setSubscriptionStartDate(today);
        user.setSubscriptionEndDate(oneMonthLater);
        user.setCardCompany(cardCompany);


        return userRepository.save(user);
    }

    public UserEntity unsubscribeUser(Long id) {
        UserEntity user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        user.setSubscribed(false);
        user.setSubscriptionStartDate(null);
        user.setSubscriptionEndDate(null);
        user.setCardNumber(null);
        user.setCardCompany(null);

        return userRepository.save(user);
    }



    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }
}
