$(document).ready(function() {
  $("#validate-creditcard-form :input[name='creditcard-number']").keyup(function(event){
    hideMessage();
  });

  $( "#validate-creditcard-form" ).submit(function( event ) {
    hideMessage();
    var input = $("#validate-creditcard-form :input[name='creditcard-number']").val();

    if(!input){
      showInValidMessage("You must enter a value")
      return false;
    }

    if(!valid_credit_card_simple(input)){
      showInValidMessage("All digits can not be the same")
      return false;
    }

    if(!valid_credit_card_luhn(input)){
      showInValidMessage("The number entered is invalid")
      return false;
    }

    showValidMessage("The number entered is valid!")

    event.preventDefault();
    return false;
  });
});

function showValidMessage (message){
  $("#error-message").html(message);
  $("#error-message").addClass("valid");
  $("#error-message").removeClass("invalid");
  $("#error-message").removeClass("hide");
}

function showInValidMessage (message){
  $("#error-message").html(message);
  $("#error-message").addClass("invalid");
  $("#error-message").removeClass("valid");
  $("#error-message").removeClass("hide");
}

function hideMessage (){
  $("#error-message").html("");
  $("#error-message").addClass("hide");
}

function valid_credit_card_simple(value){
  return !(/^(.)\1+$/.test(value));
}

// takes the form field value and returns true on valid number
function valid_credit_card_luhn(value) {
// accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

// The Luhn Algorithm. It's so pretty.
    var nCheck = 0, nDigit = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) == 0;
}
