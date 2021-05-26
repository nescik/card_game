let $plansza = $(".plansza");

function menu(){
    
    let poziomy = ["Łatwy", "Średni", "Trudny"];
    $plansza.html('<div class="poziomy"></div>');
    let $poziomy = $(".poziomy");
    
    for(let i=0; i < poziomy.length; i++ )
    {
        $poziomy.append('<button class="btn">'+ poziomy[i]+"</button>");
    }
    $(".btn").each(function(i){
       $(this).on("click", () => graj(i)) ;
    });
};

menu();

function graj(podajPoziom){
        
        let obrazki = [];
        $plansza.html('<div class="pole"></div>');
        let poziom;
        let $pole = $(".pole");
        
    switch(podajPoziom){
        case 0:
            poziom = "latwy";
            para = 8;
            break;
        case 1:
            poziom = "sredni";
            para = 10;
            break;
        case 2:
            poziom = "trudny";
            para = 15;
            break;
    }
    
        $pole.addClass(poziom);
        
            for (let i=1; i<= para; i++){
                obrazki.push(i + ".png");
            }
                
            let div = "";
            let liczbaKart = para*2;
            for ( i = 0; i < liczbaKart;i++)
            {
                    div += '<div class="karta" id="k'+i+'"></div>';
            }
            div+='<div class="wynik">Licznik rund: 0</div>';
            $('.pole').html(div);
            
            
            
            // funkcja, która dubluje tablice oraz sortuje ją w losowej kolejności
            let losoweKarty = (array) => $.map(array, (element) => [element, element]).sort(() => 0.5 - Math.random());

            karty = losoweKarty(obrazki);
            

            $(".karta").each(function(i){
                $(this).on("click", () => odslonKarte(i)) ;
             });


            let pierwszaKarta = false;
            let rundy = 0;
            let pierwszaKarta_nr;
            let zablokuj = false;
            

            function odslonKarte(nr)
            {
                let widocznosc  = $("#k"+nr).css("opacity");

                if(widocznosc !== 0 && zablokuj === false && nr !== pierwszaKarta_nr)
                    {
                      zablokuj = true;
                      let obraz = "url(img/" + karty[nr] + ")";

                    $("#k"+nr).css("background-image", obraz);
                    $("#k"+nr).addClass("kartaAktywna");
                    $("#k"+nr).removeClass("karta");

                    if(pierwszaKarta === false)
                    {
                        pierwszaKarta = true;
                        pierwszaKarta_nr = nr;
                        zablokuj = false;
                    }
                    else
                    {
                        if(karty[pierwszaKarta_nr] === karty[nr])
                        {
                            setTimeout(function() { ukryjKarty(nr, pierwszaKarta_nr); }, 500);
                        }
                        else
                        {
                            setTimeout(function() { resetujKarty(nr, pierwszaKarta_nr); }, 750);
                        }

                        rundy++;
                        $(".wynik").html("Ilość rund: "+rundy);
                        pierwszaKarta = false;
                    }
                }
            }


            function ukryjKarty (nr1, nr2)
            {
                $("#k"+nr1).css("opacity", "0");
                $("#k"+nr2).css("opacity", "0");
                para--;
                if(para === 0){
                    $plansza.html("<br><br><br><h1>Wygrałeś!<br>Skończone w "+rundy+" rundach.</h1><br> \n\
                        <span class='reset' onclick='location.reload()'>Zacznij nową gre.</span>");
                }
                
                zablokuj = false;
            }

            function resetujKarty (nr1, nr2){
                $("#k"+nr1).css("background-image", "url(img/karta.png)");
                $("#k"+nr1).addClass("karta");
                $("#k"+nr1).removeClass("kartaAktywna");

                $("#k"+nr2).css("background-image", "url(img/karta.png)");
                $("#k"+nr2).addClass("karta");
                $("#k"+nr2).removeClass("kartaAktywna");

                zablokuj = false;
            }
}

