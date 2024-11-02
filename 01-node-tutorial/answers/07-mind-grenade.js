function bombCountdown() {
  console.log("bomb is active!");

  let countdown = 5;

  const timer = setInterval(() => {
    if (countdown > 0) {
      console.log(`timer show ${countdown} seconde...`);
      countdown--;
    } else {
      console.log("hey hey bomb is almost boom! where is batman?");
      clearInterval(timer);

      // waiting before batman
      setTimeout(() => {
        console.log(
          "Wowowow!!! timer show 1 second !!!Batman came last moment!"
        );
      }, 1000);
    }
  }, 1000); // timer
}

//booom function
bombCountdown();
