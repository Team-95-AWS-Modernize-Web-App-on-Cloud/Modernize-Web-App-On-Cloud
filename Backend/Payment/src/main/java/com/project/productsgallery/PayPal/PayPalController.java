package com.project.productsgallery.PayPal;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class PayPalController {

    private final PayPalService payPalService;

    @Value("${paypal.successUrl}")
    private String PayPalSuccessUrl;

    @Value("${paypal.cancelUrl}")
    private String PayPalCancelUrl;
    @GetMapping("/hello")
    public String sayHello() {
        return "hello world";
    }
    @PostMapping("/payment/create")
    public ResponseEntity<String> createPayment(@RequestParam("method") String method, @RequestParam("amount") String amount, @RequestParam("currency") String currency, @RequestParam("description") String description) {
        try {
            String cancelUrl = PayPalCancelUrl;
            String successUrl = PayPalSuccessUrl + "/payment/success";

            Payment payment = payPalService.createPayment(Double.valueOf(amount), currency, method, "sale", description, cancelUrl, successUrl);

            for (Links link : payment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    return ResponseEntity.ok(link.getHref());
                }
            }
        } catch(PayPalRESTException e) {
            log.error("Error is: ", e);
        }
        return ResponseEntity.status(500).body("Server error when processing Payment");
    }

    @GetMapping("/payment/success")
    public String paymentSuccess(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        try {
            Payment payment = payPalService.executePayment(paymentId, payerId);
            if(payment.getState().equals("approved")) {
                return "Payment Success";
            }
        } catch(PayPalRESTException e) {
            log.error("Error occured when executing payment: ", e);
        }
        return "Payment Success";
    }

    @GetMapping("/payment/cancel")
    public String paymentCancel() {
        return "Payment Cancel";
    }

    @GetMapping("/payment/error")
    public String paymentError() {
        return "Payment Error";
    }
}
