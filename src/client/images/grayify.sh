for x in *.png
do
root=`echo $x | sed -e "s/.png//"`
convert $x -type Grayscale -alpha on gray/${root}.png
done
