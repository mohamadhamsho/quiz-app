let quizApp =  document.querySelector('.quiz-app')
    startPage = document.querySelector('.start-page'),
    startPageInput = document.querySelector('.start-input'),
    startBtn = document.querySelector('.start-page .btn'),
    personeName = document.querySelector('.persone-name'),
    countDown = document.querySelector('.timer-countdown div'),
    questionCount = document.querySelector('.question-count'),
    question = document.querySelector('.question'),
    scorePage = document.querySelector('.score-page'),
    index = 0;
        // Get General Variables
let ques, answers, quesNumber, quesLength, btnNext;
let correctAnswers = 0,
    wrongAnswers = 0,
    attempt = 0;
let timeValue = 15;





    function getInfos(){
        if (startPageInput.value !== ""){

            document.body.classList.add('white');
            startPage.classList.add('hidden');
            quizApp.classList.add('active');
            personeName.innerHTML = startPageInput.value;
            
            // Count Down Timer
            startTimer(timeValue);
            startTimerLine(0)
            

            startPageInput.value = ""
        } else {
            console.log('This is empty')
        }
    }
    getInfos()
    
    // Get Main Informations
    function getInformations(){
        // Get Question Number And Questions Length
        quesNumber = questions[index].number;
        quesLength = questions.length;
        
        questionCount.innerHTML = `<span>Question ${quesNumber}/${quesLength}</span>`;
        
        // Get The Main Question
        ques = questions[index].ques;
        question.innerHTML = `${quesNumber}. ${ques}`;
        
        // Get The Options Of Answers
        let answersHtml = document.querySelector('.answers');
        answers = questions[index].options;
        
        answersHtml.innerHTML = 
        `<div class="item" id="1">${answers[0]}</div>
        <div class="item" id="2">${answers[1]}</div>
        <div class="item" id="3">${answers[2]}</div>
        <div class="item" id="4">${answers[3]}</div>`
        
let quizBody = document.querySelector('.quiz-body'),
    answersContainer = document.querySelector('.answers'),
    allAnswers = Array.from(answersContainer.children);

        allAnswers.forEach(answer =>{
            answer.onclick = function (){
                let theCorrectAnswer = questions[index].correctAnswer;
                
                let theChoise = +answer.id;
                if (theChoise === theCorrectAnswer) {
                    answer.classList.add('correct');                                
                    correctAnswers += 1;
                    
                } else {
                    answer.classList.add('wrong')
                    wrongAnswers += 1;
                }
                allAnswers.forEach(item =>{
                    item.classList.add('disabled')
                })
                countDown.classList.remove('opacity')
                countDown.classList.remove('active')
                clearInterval(counter)
                clearInterval(counterLine)

                if(quesNumber === quesLength){
                    btnNext.innerHTML = "Quiz Result"
                }
                setTimeout(() =>{
                                                    
                        countDown.classList.add('active')
                        
                    }, 2000)
                }
            })

        // Assign Next Button To Create Function By It
        btnNext = document.querySelector('.btn button');

        // Next Button Function
        btnNext.addEventListener('click', nextQuestion)

    }

getInformations()    
    // Create Bullets Spans 
    function getBulletSpans(){
        let bulletsContainer = document.querySelector('.bullets');
        for (let i=0; i<questions.length; i++){

            let span = document.createElement("span");
    
            bulletsContainer.appendChild(span)

            if (i === 0) {
                span.classList.add('active')
            }
        }
    }
getBulletSpans()
    // Add Active Class To Span Current Question
    function addSpanActive(index){
        let allSpan = document.querySelectorAll('.bullets span');
        allSpan.forEach((span, spanIndex) =>{
            if (spanIndex === index) {
                span.classList.add('active')
            }
        })
    }

    function showScore(){
        quizApp.classList.remove('active');
        scorePage.classList.add('active');
        document.body.classList.remove('white');

        console.log('Your Quiz Is Completed')
    }
            
    // Next Button Function
    function nextQuestion(){
        index++;

        // Reassign Count Down Timer
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(0)

        // Add Span Active Function
        addSpanActive(index)
        
        // let answers = document.querySelector('.answers');
        // answers.classList.add('active');
        
        


        let percentage = document.querySelector('.percentage'),
            congrats = document.querySelector('.congrats'),
        rightAnswers = document.querySelector('.right-answers'),
        falseAnswers = document.querySelector('.wrong-answers');
        
        if (correctAnswers === 0) {
            percentage.innerHTML = `Your Score 0% `;
            congrats.innerHTML = 'Dammage !';
        } else if (correctAnswers <= (quesLength / 3)) {
            percentage.innerHTML = `Your Score 20%`
            congrats.innerHTML = 'Not Bad !';
        } else if (correctAnswers === (quesLength / 2)) {
            percentage.innerHTML = `Your Score 50%`
            congrats.innerHTML = ' Good.. Congratulations !';
        }else if (correctAnswers === (quesLength - 2)) {
            percentage.innerHTML = `Your Score 80%`
            congrats.innerHTML = 'Very Good.. Congratulations  !';
        }else if (correctAnswers === (quesLength)) {
            percentage.innerHTML = `Your Score 100%`
            congrats.innerHTML = 'Excellent.. Congratulations  !';
        }




        rightAnswers.innerHTML = `<span>Right Answers</span>
        <span>${correctAnswers}/${quesLength}</span>`;
        falseAnswers.innerHTML = `<span>Wrong Answers</span>
        <span>${wrongAnswers}/${quesLength}</span>`;
        














        
        if (quesNumber < quesLength) {
            getInformations()


        } else {
            countDown.classList.remove('active')
            clearInterval(counter)
            clearInterval(counterLine)

            showScore()
            
            
        }
    }
    
    function startTimer(time){
    counter = setInterval(timer, 1000);
        function timer(){
            countDown.textContent = time;
            time--;
            countDown.classList.add('active')
            if (countDown.textContent > 0) {

                countDown.textContent -= 1;
                if(countDown.textContent < 6){
                    countDown.classList.add('opacity')
                } else {
                    countDown.classList.remove('opacity')
                }
            } else {
                clearInterval(counter)
                nextQuestion()
            }
        }
    }
let timeLine = document.querySelector('.time-line');
    function startTimerLine(time){
    counterLine = setInterval(timer, 45);
        function timer(){
            time += 1;
            timeLine.style.width = time + "px";
            if (time > 549){
                clearInterval(counterLine)
            }
        }
    }
    startBtn.addEventListener('click', getInfos)
    startPageInput.addEventListener('keyup', (e)=>{
        if (e.keyCode === 13){
            getInfos()
        }
    })


    let replayQuiz = document.querySelector('.replay-quiz');

    replayQuiz.onclick = function(){
        index = 0;
        quesNumber = 0;
        getInformations();
        let allSpan = document.querySelectorAll('.bullets span');
        allSpan.forEach(span => span.classList.remove('active'))
        allSpan[0].classList.add('active')
        correctAnswers = 0;
        wrongAnswers = 0;
        startPage.classList.remove('hidden');
        scorePage.classList.remove('active');

    }


    const myArray = ['Mohamad','Wajed','Amir','Hussein','Majed','Omer','Nahla','Yussuf','Safi','Hassan'];


    function shuffleArray(array){

        array.sort((a,b) => 0.5 - Math.random())

        return array;
    }