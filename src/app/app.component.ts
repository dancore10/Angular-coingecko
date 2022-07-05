import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Coin {
  id: string,
  name: string,
  symbol: string,
  image: string,
  current_price: number,
  price_change_percentage_24h: number,
  total_volume: number
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  
  constructor(
    private http: HttpClient
  ){}
  
  filteredCoins: Coin[] = []
  coins: Coin[] = []
  titles: string [] = [
    '#',
    'Coin',
    'Price',
    'Price change',
    '24H volume'
  ]

  searchText = '';

  searchCoin() {
    this.filteredCoins = this.coins.filter((coin) => 
      coin.name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
      coin.symbol.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())
    );
  }

  getCoinsMarket() {
    this.http
    .get<Coin[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .subscribe(
      (res) => {
        this.coins = res
        this.filteredCoins = res
      },
      (err) => console.log(err)
    )
  }

  ngOnInit(): void {
    this.getCoinsMarket()
  }

}
