
# Web Glare - New Tab
v - Alpha 0.0.0

> ***Achieve more doing less***

Web Glare is an **open-source web browser extension** designed to rework and empowers the start page of your web browser with commands, options and modes.

## Features

Most features are revolved around getting things done through the main command line, be it normal web search, translation, or running code.

## Modes

Modes are a mean to give the command line a whole new use. It provides a different functionality to the main command line giving you new utilities such as translation and running Javascript code

#### Translation
Web Glare provides a free translation service through the translation mode. This mode allows the user to input a target language and a text they wish to be translated, and the extension will route your translation request through a proxied DeepL free tier translation API. 

The language codes are as specified by DeepL's own API [language code](https://developers.deepl.com/docs/getting-started/supported-languages) list

Do note that, by DeepL's terms of service, the processed data will be used for improvements and training their models on their end.

In the future, if this project becomes well funded, I do have plans to host our own Libretranslate API, but for now it is using DeepL.

#### Javascript
This mode allows the execution of javascript code inputted into the command line. The code is executed inside a HTML iframe component.

The return results are given back to the user through the command line items in chronological order.

## Options

The Command system has display system to support a few extra parameters if the modes wishes to utilize. Currently the default mode offers Image Search and Map search that directly sends you to the image search / map search of your choice.

## Personalization

Currently the extension offers minimal personalization, with only the display name and toast settings. I would probably be adding enable/disable of available modes and or custom theming if possible.
