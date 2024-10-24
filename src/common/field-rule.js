export const accountRule = (account) => {
    let ruleValidation = { success: false };
    
    if (account && typeof account === 'string'){
        account = account.trim();
        
        if (account == ''){
            ruleValidation.msg = '請輸入帳號';
        }else if (account.length < 5 || account.length > 12){
            ruleValidation.msg = '長度請介於5~12個字母之間';
        }else{
            ruleValidation.success = true;
        }
    }

    return ruleValidation;
}

export const passwordRule = (password) => {
    let ruleValidation = { success: false };
    if (password && typeof password === 'string'){
        password = password.trim();
        
        if (password == ''){
            ruleValidation.msg = '請輸入密碼';
        }else if (password.length < 8 || password.length > 13){
            ruleValidation.msg = '長度請介於8~13個字母之間';
        }else{
            ruleValidation.success = true;
        }
    }
    
    return ruleValidation;
}