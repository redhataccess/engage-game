class WinnerState extends Phaser.State {

    init({ score }) {
        this.score = score;
    }

    create() {
        console.log('[winner] starting winner state');

        this.formWrap = document.querySelector('.winner-form');
        this.form = document.querySelector('.winner-form form');
        this.submit = document.querySelector('#submit-form');
        this.name = document.querySelector('#nick');
        this.email = document.querySelector('#email');
        this.agree = document.querySelector('#agree');

        this.myOnSubmit = this.onSubmit.bind(this);
        this.form.addEventListener('submit', this.myOnSubmit);

        this.game.time.events.add(1000, () => this.formWrap.classList.remove('hidden'), this);
    }

    update() {
    }

    shutdown() {
        this.form.removeEventListener('submit', this.myOnSubmit);
        this.formWrap.classList.add('hidden');
        this.agree.classList.remove('please');
        this.agree.checked = false;
        this.name.value = '';
        this.email.value = '';
    }

    next() {
        this.game.stateTransition.to('SplashState', true, false, { fromPlay: true });
    }

    onSubmit() {
        console.log('[winner] submitting form');
        if (agree.checked) {
            this.reportScore(this.name.value, this.email.value, this.score);
        }
        else {
            this.agree.classList.add('please');
        }
        return false;
    }

    reportScore(name, email, score) {
        console.log('[winner] reporting score');

        // remove < characters to prevent any chance of xss attack
        name = name.replace(/</g , "");
        email = email.replace(/</g , "");

        // also make max length for names and emails
        name = name.substr(0, config.MAX_INPUT_LENGTH);
        email = email.substr(0, config.MAX_INPUT_LENGTH);

        return fetch(
            config.PARSE_URL,
            {
                method: 'POST',
                headers: {
                    'X-Parse-Application-Id': 'ENGAGE',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, score, email }),
            }
        ).then(response => {
            response.json();
            console.log('[winner] score reported');
            this.next();
        });
    }
}

// out here as a quick hack to avoid complex context binding
