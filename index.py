#!/usr/bin/env python
# -*- coding: utf-8 -*-spy
import requests
from bs4 import BeautifulSoup

url = 'https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=%EC%98%81%ED%99%94+%EA%B0%9C%EB%B4%89+%EC%98%88%EC%A0%95%EC%9E%91'
headers = {
	'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
}

response = requests.get(url, headers=headers)

soup = BeautifulSoup(response.text, 'lxml')

movieInfoList = soup.find('ul', attrs={'class':'list_movie'}).find_all('li')

for movieInfo in movieInfoList:
		movieImg = movieInfo.find('img')
		movieTitle = movieInfo.find('a', attrs={'class':'txt_ellip'})
		movieScore = movieInfo.find('dd', attrs={'class':'cont'})

		movieImgFix = movieImg['src'].replace("https://search1.daumcdn.net/thumb/C116x164.q85/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fmovie%2F", "https://t1.daumcdn.net/movie/")

		#print(f'{movieTitle.get_text() if movieTitle else "X"}')
		print('{}'.format(movieImgFix if movieImgFix else "X"))
		#print(f'{movieScore.get_text() if movieScore else "X"}')
