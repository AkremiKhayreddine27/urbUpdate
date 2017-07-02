package com.urbupdate.services;


import com.urbupdate.forms.Register;
import com.urbupdate.model.User;
import com.urbupdate.validation.EmailExistsException;

/**
 * Created by Khayreddine on 19/06/2017.
 */
public interface IUserService {
    User registerNewUserAccount(Register accountDto)
            throws EmailExistsException;
}
