import _ from 'lodash'
import angular from '../images/angular.png'
import bootstrap from '../images/bootstrap.png'
import backbone from '../images/backbone.png'
import codewars from '../images/codewars.png'
import cpp from '../images/cpp.png'
import csharp from '../images/csharp.png'
import css3 from '../images/css3.png'
import dotnet from '../images/dotnet.png'
import ember from '../images/ember.png'
import figma from '../images/figma.png'
import github from '../images/github.png'
import html5 from '../images/html5.png'
import java from '../images/java.png'
import jquery from '../images/jquery.png'
import js from '../images/js.png'
import meteor from '../images/meteor.png'
import mongodb from '../images/mongodb.png'
import mysql from '../images/mysql.png'
import nest from '../images/nest.png'
import nodejs from '../images/nodejs.png'
import photoshop from '../images/photoshop.png'
import php from '../images/php.png'
import python from '../images/python.png'
import react from '../images/react.png'
import redux from '../images/redux.png'
import ruby from '../images/ruby.png'
import sass from '../images/sass.png'
import trello from '../images/trello.png'
import typescript from '../images/typescript.png'
import vscode from '../images/vscode.png'
import vuejs from '../images/vuejs.png'
import webpack from '../images/webpack.png'
import webstorm from '../images/webstorm.png'

import { getRandomInt, shuffleAllElements } from '../simpleFunc';

const allCards = [
  {isFlipped: false, section: 'frameworks', isOpened: false, imageSrc: angular, value: 'angular'},
  {isFlipped: false, section: 'frameworks', isOpened: false, imageSrc: backbone, value: 'backbone'},
  // {isFlipped: false, isOpened: false, imageSrc: bootstrap, value: 'bootstrap'},
  {isFlipped: false, section: 'tools', isOpened: false, imageSrc: codewars, value: 'codewars'},
  {isFlipped: false, section: 'languages', isOpened: false, imageSrc: cpp, value: 'cpp'},
  {isFlipped: false, section: 'languages', isOpened: false, imageSrc: csharp, value: 'csharp'},
  // {isFlipped: false, isOpened: false, imageSrc: css3, value: 'css3'},
  {isFlipped: false, section: 'languages', isOpened: false, imageSrc: dotnet, value: 'dotnet'},
  {isFlipped: false, section: 'frameworks', isOpened: false, imageSrc: ember, value: 'ember'},
  {isFlipped: false, section: 'tools', isOpened: false, imageSrc: figma, value: 'figma'},
  {isFlipped: false, section: 'tools', isOpened: false, imageSrc: github, value: 'github'},
  // {isFlipped: false, isOpened: false, imageSrc: html5, value: 'html5'},
  {isFlipped: false, section: 'languages', isOpened: false, imageSrc: java, value: 'java'},
  // {isFlipped: false, isOpened: false, imageSrc: jquery, value: 'jquery'},
  {isFlipped: false, section: 'languages', isOpened: false, imageSrc: js, value: 'js'},
  {isFlipped: false, section: 'frameworks', isOpened: false, imageSrc: meteor, value: 'meteor'},
  // {isFlipped: false, isOpened: false, imageSrc: mongodb, value: 'mongodb'},
  // {isFlipped: false, isOpened: false, imageSrc: mysql, value: 'mysql'},
  {isFlipped: false, section: 'frameworks', isOpened: false, imageSrc: nest, value: 'nest'},
  // {isFlipped: false, isOpened: false, imageSrc: nodejs, value: 'nodejs'},
  {isFlipped: false, section: 'tools', isOpened: false, imageSrc: photoshop, value: 'photoshop'},
  {isFlipped: false, section: 'languages', isOpened: false, imageSrc: php, value: 'php'},
  {isFlipped: false, section: 'languages', isOpened: false, imageSrc: python, value: 'python'},
  {isFlipped: false, section: 'frameworks', isOpened: false, imageSrc: react, value:'library React'},
  {isFlipped: false, section: 'frameworks', isOpened: false, imageSrc: redux, value: 'library Redux'},
  {isFlipped: false, section: 'languages', isOpened: false, imageSrc: ruby, value: 'ruby'},
  // {isFlipped: false, isOpened: false, imageSrc: sass, value: 'sass'},
  {isFlipped: false, section: 'tools', isOpened: false, imageSrc: trello, value: 'trello'},
  // {isFlipped: false, isOpened: false, imageSrc: typescript, value: 'typescript'},
  {isFlipped: false, section: 'tools', isOpened: false, imageSrc: vscode, value: 'vscode'},
  {isFlipped: false, section: 'frameworks', isOpened: false, imageSrc: vuejs, value: 'vuejs'},
  {isFlipped: false, section: 'tools', isOpened: false, imageSrc: webpack, value: 'webpack'},
  {isFlipped: false, section: 'tools', isOpened: false, imageSrc: webstorm, value: 'webstorm'},
];

const initCardsCount = 4;
const lowerBoundForCreationId = 100;
const upperBoundForCreationId = 110;

function getSelectedCards(initArray, section, count) {
  if (section === 'all' && count === 'all') return initArray;
  let transformArray = [];
  if (section === 'all') {
    transformArray = initArray
  } else {
    transformArray = initArray.filter((item) => item.section === section)
  }
  const transformArray2 = transformArray.sort(shuffleAllElements);
  const transformArray3 = transformArray2.splice(0, count);
  return transformArray3
}

const selectedSection = localStorage.getItem('section') || 'languages';
const selectedCount = localStorage.getItem('cardsCount') || initCardsCount;
const selectedCards = getSelectedCards(allCards, selectedSection, selectedCount)

const selectedCardsDublicate = _.cloneDeep(selectedCards);
const selectedPairOfCards = [...selectedCards, ...selectedCardsDublicate];

const shuffledSelectedPairOfCards = selectedPairOfCards.sort(shuffleAllElements);
shuffledSelectedPairOfCards.forEach((item, index) => item.id = getRandomInt(index * lowerBoundForCreationId, index * upperBoundForCreationId))

export default shuffledSelectedPairOfCards