<div class="flex justify-center items-start w-[10.5rem] h-[10.5rem] bg-red-500 circle">
    <div class="relative opacity-0 bg-white w-[1rem] h-[7rem] sign"></div>
</div>

<style>
    .circle {
        border-radius: 50%;
        animation:
            circle-appearance 0.8s ease-in-out 1 forwards,
            set-overflow 0.1s 1.1s forwards;
    }

    .sign {
        animation-duration: 0.8s;
        animation-delay: 0.2s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        transform: translateY(25%) rotate(45deg) scale(0.1);
        border-radius: 50% 50% 50% 50% / 10%;
        animation-name: failure-sign-appearance;
    }

    .sign::before,
    .sign::after {
        content: '';
        position: absolute;
        background: inherit;
    }

    .sign::before {
        top: 50%;
        width: 100%;
        height: 100%;
        transform: translateY(-50%) rotate(90deg);
        border-radius: inherit;
    }

    .sign::after {
        left: 100%;
        top: 0;
        width: 500%;
        height: 95%;
        transform: translateY(4%) rotate(0deg);
        border-radius: 0;
        opacity: 0;
        animation: set-shaddow 0s 1.13s ease-in-out forwards;
        z-index: -1;
        background: rgba(175, 57, 55, 0.8);
    }

    @keyframes circle-appearance {
        0% {
            transform: scale(0);
        }

        50% {
            transform: scale(1.5);
        }

        60% {
            transform: scale(1);
        }

        100% {
            transform: scale(1);
        }
    }

    @keyframes failure-sign-appearance {
        50% {
            opacity: 1;
            transform: translateY(25%) rotate(45deg) scale(1.7);
        }

        100% {
            opacity: 1;
            transform: translateY(25%) rotate(45deg) scale(1);
        }
    }

    @keyframes set-shaddow {
        to {
            opacity: 1;
        }
    }

    @keyframes set-overflow {
        to {
            overflow: hidden;
        }
    }
</style>
