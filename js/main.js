


    loadHeader();

    //carrega header (navbar) comum em todas as páginas
    function loadHeader(){
        
        var header = new XMLHttpRequest();
        header.open("GET", "templates/header.html", true);
        header.onreadystatechange = function() {
          if (header.readyState === 4) {  
            if (header.status === 200) {  
              headerContent = header.responseText;
              var headerElement = document.getElementsByTagName('header')[0];
              headerElement.innerHTML = headerContent;
              setActivePage();
            }
          }
        }
        header.send(null);

    }

    //seta a página ativa na navbar
    function setActivePage(){
        let page = ( location.href.split('/').pop()!= "" ? location.href.split('/').pop() : 'index.html' ) ;
        document.querySelectorAll("header ul li a[href='"+page+"']")[0].parentElement.classList.add('active');
    }

    //atualiza minha idade automaticamente de acordo com minha data de nascimento em todas as paginas do site
    let idade = document.getElementById('idade');
    
    if( idade != null ){
        idade.innerHTML = getAge('1995/10/15') + ' anos';
    }

    //obtem quantos anos existem entre a data atual e a recebida como parametro
    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

