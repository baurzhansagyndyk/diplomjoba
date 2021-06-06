import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';

const KIRILL_UPPER = [
  'А',
  'Ә',
  'Б',
  'В',
  'Г',
  'Ғ',
  'Д',
  'Е',
  'Ё',
  'Ж',
  'З',
  'ИЯ',
  'И',
  'Й',
  'К',
  'Қ',
  'Л',
  'М',
  'Н',
  'Ң',
  'О',
  'Ө',
  'П',
  'Р',
  'С',
  'Т',
  'У',
  'Ұ',
  'Ү',
  'Ф',
  'Х',
  'Һ',
  'ЦЦ',
  'Ц',
  'Ч',
  'Ш',
  'Щ',
  'Э',
  'Ю',
  'Я',
  'І',
  'Ы',
  'ь',
  'ъ',
];

const LATIN_UPPER = [
  'A',
  'Ä',
  'B',
  'V',
  'G',
  'Ğ',
  'D',
  'E',
  'E',
  'J',
  'Z',
  'İA',
  'İ',
  'İ',
  'K',
  'Q',
  'L',
  'M',
  'N',
  'Ñz',
  'O',
  'Ö',
  'P',
  'R',
  'S',
  'T',
  'U',
  'Ū',
  'Ü',
  'F',
  'H',
  'H',
  'TS',
  'S',
  'Ş',
  'Ş',
  'ŞŞ',
  'E',
  'İU',
  'İA',
  'I',
  'Y',
  '',
  '',
];

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  kirill_upper = KIRILL_UPPER;
  latin_upper = LATIN_UPPER;
  kirill_lower = KIRILL_UPPER.map((letter) => letter.toLowerCase());
  latin_lower = LATIN_UPPER.map((letter) => letter.toLowerCase());
  kirill: string[];
  latin: string[];
  convertedData: string;
  data = new FormControl('');
  constructor() {}

  ngOnInit() {
    this.kirill = [...this.kirill_upper, ...this.kirill_lower];
    this.latin = [...this.latin_upper, ...this.latin_lower];
    this.latin[this.latin.length - 4] = 'ı';
  }

  convert(): void {
    let data = this.data.value.trim();
    for (const letter of data) {
      const index = this.kirill.findIndex(
        (kirilLetter) => kirilLetter === letter,
      );
      if (index !== -1) {
        data = data.replaceAll(letter, this.latin[index]);
      }
    }
    this.convertedData = data;
  }
}

// kirill = kirill_upper + [x.lower() for x in kirill_upper]
// latin = latin_upper + [x.lower() for x in latin_upper]
// latin[-4]='ı'
// def converter(request):
//     data = request.POST.get("name", None)
//     if request.method == "POST":
//             for i in kirill:
//                 data = data.replace(i, latin[kirill.index(i)])
//     print(data)
//     return render(request, 'converter.html',{'data': data})
