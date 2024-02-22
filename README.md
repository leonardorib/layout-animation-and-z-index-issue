# Reanimated Layout Animation and z-index issue on Android

This is a minimal repro demonstrating an issue with z-index behavior on Android after a Reanimated layout animation being triggered on the app.

Z-index positioning behaves as you would expect consistently until the first layout animation is triggered at any point on the app. From that point, if Views that rely on z-index to be positioned are unmounted and remounted, the behavior will not be realiable anymore.

What I learned on my tests is that you don't even need to be on the same screen where you triggered the layout animation. On your whole app you can't expect z-index to behave properly anymore if you're unmounting/remounting with conditional rendering.

## Instructions

1. Make sure you are running it on Android
2. Toggle the blue View visibility on and off multiple times. It should work consistently and the blue View should be always on top of the red one when visible.
3. Now press the "Trigger Layout Animation" button.
4. Try step 2 again by toggling the visbility multiple times. After three or four toggles it's not reliable anymore.
