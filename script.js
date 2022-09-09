"use strict";

const PORT = 8000;
const URL = "https://www.foxnews.com/";
const AXIOS = require("axios");
const CHEERIO = require("cheerio");
const EXPRESS = require("express");
const FS = require("fs");


AXIOS(URL)
	.then(response => {
		const $html = response.data;
		const $ = CHEERIO.load($html);
		const articles = [];
		$('div.article-list article .info .info-header .title a', $html).each(function() {
			const link = $(this).attr("href");
			const title = $(this).text();
				articles.push({
					title, link
			});
		});
		console.log(articles);
		displayArticlesInFile(articles);
	}).catch(err => console.error(err));

const app = EXPRESS().listen(PORT, ()=> {
	console.log(`server running ${PORT}`);
});

function removeSpacing(article){
	return article.replace(/(\r\n|\n|\r)/gm, "").trim();
}

function displayArticlesInFile(articles){
	FS.writeFile("all-articles-scraped.txt", JSON.stringify(articles), err => {
		if (err){
			console.error(err);
			return;
		}
	})
}