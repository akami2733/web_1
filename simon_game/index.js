var is_game_over = true
var level = 1
var questions = []
var answers = []
var answer_index = 0

function on_key_press() {
    if (is_game_over)
        start_game()
}

function on_button_pressed() {
    if (!is_game_over)
        update_game(this.id)
}

function reset_game() {
    is_game_over = true
    level = 1
}

function start_game() {
    is_game_over = false
    level = 0
    questions = []
    answers = []
    next_level()
}

function update_game(key) {
    document.getElementById(key).classList.add("pressed")
    let timer = setInterval(() => {
        document.getElementById(key).classList.remove("pressed")
        clearInterval(timer)
    }, 200)
    if (questions[answer_index++] == key) {
        new Audio("sounds/" + key + ".mp3").play()
        if (answer_index >= questions.length) {
            let timer = setInterval(() => {
                next_level()
                clearInterval(timer)
            }, 500)
        }
    }
    else {
        new Audio("sounds/wrong.mp3").play()
        game_over()
    }
}

function next_level() {
    level += 1
    init_level()
    document.querySelector("#level-title").innerText = "Level " + level
}

function game_over() {
    is_game_over = true
    document.querySelector("#level-title").innerText = "Game Over, Press Any Key to Restart"
}

function init_level() {
    answer_index = 0
    var seed = Math.random() * 4
    var new_question
    if (seed < 1)
        new_question = "red"
    else if (seed < 2)
        new_question = "green"
    else if (seed < 3)
        new_question = "blue"
    else
        new_question = "yellow"
    questions.push(new_question)
    
    display_new_question(new_question)
}

function display_new_question(question) {
    new Audio("sounds/" + question + ".mp3").play()
    opacity_animation(document.querySelector("#" + question), 0.5, () => {
        opacity_animation(document.querySelector("#" + question), 1, null)
    })
}

function opacity_animation(target, target_value, callback) {
    var initial_value = parseFloat(target.style.opacity)
    initial_value = isNaN(initial_value) ? 1 : initial_value
    var value = initial_value
    let timer = setInterval(() => {
        if ((value < target_value && initial_value > target_value)
            || (value > target_value && initial_value < target_value)) {
            callback?.()
            clearInterval(timer)
            return
        }
        value = value > target_value ? value - 0.03 : value + 0.03
        target.style.opacity = value
    }, 1)
}

document.addEventListener("keypress", on_key_press)
document.querySelectorAll(".btn").forEach(btn => btn.addEventListener("click", on_button_pressed))
reset_game()
