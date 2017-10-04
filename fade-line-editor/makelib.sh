echo $'//BEGIN\n\n' >lib/lib.js
cat ./node_modules/jquery/dist/jquery.min.js >> lib/lib.js
echo $'\n\n' >>lib/lib.js
cat ./js/jquery.event.move.js >> lib/lib.js
echo $'\n\n' >>lib/lib.js
cat ./node_modules/pressure/dist/jquery.pressure.min.js >> lib/lib.js
echo $'\n\n' >>lib/lib.js
cat ./js/p5.min.js >> lib/lib.js

echo $'\n\n' >>lib/lib.js
echo $'//END' >>lib/lib.js