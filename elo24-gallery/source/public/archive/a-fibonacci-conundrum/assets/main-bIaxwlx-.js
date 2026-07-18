(function(){const L=document.createElement("link").relList;if(L&&L.supports&&L.supports("modulepreload"))return;for(const E of document.querySelectorAll('link[rel="modulepreload"]'))e(E);new MutationObserver(E=>{for(const A of E)if(A.type==="childList")for(const D of A.addedNodes)D.tagName==="LINK"&&D.rel==="modulepreload"&&e(D)}).observe(document,{childList:!0,subtree:!0});function N(E){const A={};return E.integrity&&(A.integrity=E.integrity),E.referrerPolicy&&(A.referrerPolicy=E.referrerPolicy),E.crossOrigin==="use-credentials"?A.credentials="include":E.crossOrigin==="anonymous"?A.credentials="omit":A.credentials="same-origin",A}function e(E){if(E.ep)return;E.ep=!0;const A=N(E);fetch(E.href,A)}})();const T=`
                    A FIBONACCI CONUNDRUM
        HERE, HERE
        A DISTANT SOUND
        TRAVELS (A) DA DI ALA A DA A LA A A A LA DI DA A DA LALA DI
FAINTLY,
VISCERALLY
    AND THEN ALL AT ONCE.
                FROM ONE EAR
                        TO THE OTHER
                        (ON THE RIGHT)
                                A GENTLE GIANT
                                IN PEACEFUL SLUMBER
                                    EARS FANNING THE WIND
                                    TAIL STROKING THE SOIL
                            STOMACH COOING
                            MOUTH DROOLING
                            CHEST HEAVING
    RISE
                            AND
                                                FALL
                                                RISE
                            AND
    FALL
    RISE
                            AND
                                                FALL
                        A SONG.
                                            (AND A MIRACLE)
                                            (ON ITS CHEEK) 
                        AN EYELASH!
                (MAKE A WISH MAKE A WISH MAKE A WISH MAKE A WISH) DA DI ALA A DA A LA A A A LA DI DA A DA LALA DI
    A WISP OF DNA
    DELICATE, BROWN
    DARK CHOCOLATE MILO
    HER BROTHER'S EYES
    YOUR SISTER'S HAIR
    MY FATHER'S ANGER
    THE TRUNK OF A TREE.
                                        (DEAFENING EXCITEMENT) LA DA DI ALA A DA A LA A A A LA DI DA A DA LALA DI
                                            (AND HANDS TREMBLING BUT FINGERS STEADY) DA LA DI ALA A DA A LA A A A LA DI DA A DA LALA DI 
                                    (FEET SLOWLY INCHING CLOSER) LA DA DI ALA A DA A LA A A A LA DI DA A DA LALA DI
                                    AND THEN
                                    IN THE BLINK OF AN EYE
                                        IT HOVERS (AIRBORNE)
                                    TEASING,
                                THEN
                            FLIES,
                        DRIFTS
                        (AWAY) DA DI ALA A DA A LA A A A LA DI DA A DA LALA DI
    INTO THE UNKNOWN
    AWAY FROM THE VAST EXPANSE
    OF GREY, GOO AND GLUE
    AND
            INTO THE VAST EXPANSE
            OF OLIVES AND PISTACHIOS,
            OF WATER AND LIGHT,
            OF HANDSOME HUNKS
                                (TO LAY ON LAPS OF) DA DI ALA A DA A LA A A A LA DI DA A DA LALA DI
                            TALL AND DARK
                            SHORT AND THICK
                            (AND OTHERS) LA DA DI ALA A DA A LA A A A LA DI DA A DA LALA DI
                            BUT
                    (NOT HERE THOUGH, NOT YET) DA DI ALA A DA A LA A A A LA DI DA A DA LALA DI
                        SO,
                    BACK TO
                    FLOATING,
                            DRIFTING,
                                SCOURING,
                        AND SEARCHING,
                                AND JUST AROUND THE CORNER
                                        (LIKE A BLESSING IN A PALM)
                                        A HEART.
                                        VEINS RUNNING ACROSS
                                        EMBRACING AND WELCOMING
                                        AND GRAZING AND FLIRTING
                                            SOME REST (AND)
                                            (A WORTHY SPOT TO SETTLE)  LA DA DI ALA A DA A LA A A A LA DI DA A DA LALA DI
        THE MOON LOOKS OVER
        (A SIGHT, BEHOLD)
        A BIG FAT SIGH.
            AND THEN
            SUDDENLY
        A FAMILIAR SOUND
    RISE
                            AND
                                                FALL
                                                RISE
                            AND
    FALL
    RISE
                            AND
                                                FALL
                        A SONG.
                        THE SONG.
    (UGH) DA DI ALA A DA A LA A A A LA DI DA A DA LALA DI
                THE LONE EYELASH
                BACK IN THE AIR
                        DRIFTING,
                                SCOUTING,
                                    SCOURING.
                                            BLUE AND BROWN AND BLUE AND BROWN
                                            WATER AGAINST SAND
                                AND SAND AGAINST WATER
                                    BLUE AND BROWN AND BLUE AND BROWN
    FINALLY,
    THE BEACH!
            A SMOOTH (SMOOTH) PEBBLE
            BRICK RED, IN A BLANKET OF MOSS
            (PERFECT!) DA DI ALA A DA A LA A A A LA DI DA A DA LALA DI
THE MOON IS IVORY
IT'S BEEN A LONG DAY
(IT'S TIME, IT'S TIME) DA DI ALA A DA A LA A A A LA DI DA A DA LALA DI
A BIG FAT YAWN.
                BUT WHY IS
                THE TIDE RESTLESS
                THE HORIZON EVASIVE
                THE WATER COLD
                            AND THEN OUT OF NOWHERE
                A FAMILIAR SOUND SNEAKS IN
                FAINTLY,
                VISCERALLY,
                THEN ALL AT ONCE.
    EMERGING FROM THE HEART OF THE SEA,
        (RISE)
                            (AND)
                                                (FALL)
                                                (RISE)
                            (AND)
        (FALL)
        (RISE)
                            (AND)
                                                (FALL)
                            THE SONG.`;let O=document.querySelector("#text");window.addEventListener("load",async function(){let I={},L=[],N="";const E=await(await fetch("/cmu-en.json")).json();for(const A in E)I[A.toLowerCase()]=E[A];L=T.toLowerCase().match(/\b[\w']+\b|["!@#$%^&*(),.?":{}|<>\/\\[\]-]+|\n|(?: {4})|\s/g),L&&L.length>0&&(N=L.map(A=>A in I?I[A].seg.map(D=>{if(D.pattern==="U")return`<span class="guruvu transition-all ">${D.syllable}</span>`;if(D.pattern==="I")return`<span class="laghuvu transition-all">${D.syllable}</span>`}).join(""):A===`
`?"<br>":A==="    "?'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>':A===" "?A:/\W/.test(A)&&A!==" "?`<span class="text-white">${A}</span>`:`<span class="token-error">${A}</span>`).join("")),O.innerHTML=N});
