package com.urbupdate.validation;


import com.urbupdate.forms.Register;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {

    @Override
    public void initialize(final PasswordMatches constraintAnnotation) {
        //
    }

    @Override
    public boolean isValid(final Object obj, final ConstraintValidatorContext context) {
        final Register user = (Register) obj;
        System.out.println(user.getPassword()+" "+user.getMatchingPassword());
        return user.getPassword().equals(user.getMatchingPassword());
    }

}
