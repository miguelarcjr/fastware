import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  scripts = ["/assets/js/jquery.min.js","/assets/js/popper.min.js","/assets/js/bootstrap.min.js","/assets/js/jquery.easing.min.js", "/assets/js/swiper.min.js","/assets/js/jquery.magnific-popup.js","/assets/js/validator.min.js","/assets/js/scripts.js"];

  produtos: Produto[] = []

  constructor(private produtoService: ProdutoService) {

  }

  ngOnInit(): void {
    this.getProdutos();
  }

  async getProdutos() {
    this.produtos = await this.produtoService.getAll();
  }

  ngAfterViewInit(): void {
    const doc = document.getElementById('main-script') as HTMLElement;
    for (const scriptSrc of this.scripts) {
      let script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.src = scriptSrc;
      doc.appendChild(script);
    }
  }

}
