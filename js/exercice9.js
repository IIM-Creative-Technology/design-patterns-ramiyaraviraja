let donation = {
    payment: function (creditCard, amount) {
        // check if credit card is valid
        const creditCardIsValid = payment.checkCreditCard(creditCard)
       
        if (creditCardIsValid) {
            
            const enoughtProvision = payment.checkProvision(amount)

            // check provision
            if (enoughtProvision){
                // make the payment
                payment.addPayment(creditCard, amount)
            } else {
                document.querySelector('.errors').innerHTML = 'Not enought provision'
            }
        
        } else {
            // throw new Error ('Credit card is not valid or not enought provision')
            document.querySelector('.errors').innerHTML = 'Credit card is not valid'
        }
        
    },
    showPaymentHistory: function (divContainer) {
        // retrieve payments
        const payments = payment.payments

        // display in divContainer
        payments.forEach(function (payment) {
            divContainer.innerHTML += 'Payment : ' + payment.amount + 'with credit card ' + payment.card
        })
    }
}

let payment = {

   wallet: 1000,

    payments: [],
    checkCreditCard: function (creditCard) {
        creditCard = String(creditCard);
        let sum = parseInt(creditCard.charAt(creditCard.length - 1));
        for (let i = 0; i < creditCard.length - 1; i++) {
            let value = parseInt(creditCard.charAt(i))
            if (i % 2 === 0) {
                value *= 2
            }
            if (value > 9) {
                value -= 9
            }
            sum += value;
        }
        return sum % 10 === 0
    },
    addPayment: function (creditCard, amount) {
        this.payments.push({
            'card': creditCard,
            'amount': amount
        })
    },
    checkProvision: function(amount){
        if(this.wallet >= amount){
            this.wallet -= amount
            return true
        } else {
            return false
        }
    }
    
}

/*let user = {
    
    wallet: 1000,
    users: [],

    addUser: function(userId, userWallet, userCreditCard, userDonation){
        this.users.push({
            'name': userId,
            'wallet': userWallet,
            'card': userCreditCard,
            'danation': userDonation
        })

    },
    checkProvision: function(amount){
        if(wallet >= amount){
            wallet -= amount
            return wallet

        } else {
            throw new Error ('Not enought provision')
        }
    }

}*/


console.log(payment.wallet)

// add eventlisteners
document.querySelector('.button button').addEventListener('click', function () {
    // method of facade
    // e.g. :
    
    donation.payment(document.querySelector('#creditcard').value, document.querySelector('#donat').value)
    console.log(payment.wallet)

    // or show history
    //donation.showPaymentHistory(/* payments container */)
})
