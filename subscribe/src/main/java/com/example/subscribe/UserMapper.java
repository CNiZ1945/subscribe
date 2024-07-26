package com.example.subscribe;

public class UserMapper {

    public static UserDto toDto(UserEntity userEntity){
        if (userEntity == null){
            return null;
        }

        return new UserDto(
                userEntity.getId(),
                userEntity.getName(),
                userEntity.isSubscribed(),
                userEntity.getSubscriptionStartDate(),
                userEntity.getSubscriptionEndDate(),
                userEntity.getCardNumber(),
                userEntity.getCardCompany()
        );

    }

    public static UserEntity toEntity(UserDto userDto){
        if(userDto == null){
            return null;
        }

        return userDto.toEntity();
    }


}
