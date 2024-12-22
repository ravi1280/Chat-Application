package model;

public class Validation {

   

    public static boolean isPasswordValidate(String password) {
          return password.matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");


    }

    
    public static boolean isMobileNumberValid(String text) {
        return text.matches("^07[01245678]{1}[0-9]{7}$");
    }
    
  
}
