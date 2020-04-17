# ludum-46

Ludum Dare 46 Game Jam (April 17-20, 2020)

## Running locally

1.  Clone the repo

        git clone https://github.com/excaliburjs/ludum-46.git

2.  Navigate into the root directory `ludum-46` in your favorite command line tool

3.  Run the install to download the tools
       
        npm install

3.  Run the following (only needed once or if the submodule is changed) commands to setup the git submodule

        git submodule init
        git submodule update

4.  Build excalibur (takes a while the first time). This only needs to be re run if core excalibur changes.

        npm run build:excalibur

5.  Run the game locally with parcel

        npm start
