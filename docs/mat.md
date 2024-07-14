Lab1:
1a:
clc;
clear all;
close all;
A = 2; 
f0 = 1000; 
phi = pi/2 ;
t0 = 1/f0;
tt = 0 : t0/40 : 2*t0;
xx =  A*cos (2*pi*f0*tt + phi);
plot(tt,xx)
axis ([0,0.002,-4,4])
xlabel('Time (sec)');
grid on


1b:
clc;
clear all;
close all;
A = 2; 
f0 = 1000; 
phi = pi/2 ;
t0 = 1/f0;
tt = 0 : t0/40 : 2*t0;
xx =  A*cos (2*pi*f0*tt + phi);
plot(tt,xx)
axis ([0,2*t0,-4,4])
xlabel('Time (sec)');
grid on

1c:
clc;
clear all;
close all;
 
A = 2;
F = 1000;
Th = pi/2;
 
t0 = 1/F;  % Move this line outside the function to use it in plot
t = 0 : t0/40 : 3*t0;
z = sinwave(A, F, Th);  % Call the sinwave function
 
plot(t, z)
axis([0, 3*t0, -4, 4])
xlabel('Time (sec)');
ylabel('Amplitude, A');
grid on
 
function z = sinwave(A, F, Th)
    t0 = 1/F;
    t = 0 : t0/40 : 3*t0;
    z = A * sin(2*pi*F*t + Th);
end


lab2:
2a:
clc;
clear all;
close all;
%% Plot of the continuous signal
A=input('Enter the value of amplitude:');
f=input('Enter the value of frequency:');
t=0:0.01:1;
x=A*cos(2*pi*f*t);
plot(t,x)
grid
xlabel('Time index')
ylabel('Cosine signal')
title('Plot of Sinusoidal Signal')

2b:
clc;
clear all;
close all;
%Plot of the discrete signal
t=input('Enter the value of time:'); %0:0.1:1
%t1=linspace(-2*pi,2*pi,10);
figure
x1=28*cos(t);
p1=length(x1);
p=0:1:p1-1;
stem(p,x1);
grid
xlabel('Time index1')
ylabel('Amplitude1')
title('Sampled input_1')


lab3:
clc;
clear all;
close all;
%Another program code
k1 = -5;
k2 = 10;
k = k1:k2;
x = 28*(k==0);
stem(k, x)
grid on
xlabel('k')
ylabel('\delta_k')
title('Unit impulse sequence')
axis([k1 k2 0 30])

Lab4:
4a: clc;
close all;
clear all;
n=5;
for i=1:1:(2*n+1)
if(i>5)
r(i) = i-n-1;
else
r(i) = 0;
end
end
t=-n:n;
stem(t,r)
xlabel('time--->');
ylabel('Amplitude');
title('Discrete time signal');
axis([-6 6 0 10])
len=length(r)
for i=1:len
r_even(i)=(1/2)*(r(i)+r(len-i+1));
r_odd(i)=(1/2)*(r(i)-r(len-i+1));
end
figure
subplot(2,1,1);
title('even signal');
stem(t,r_even)
xlabel('Time--->');
ylabel('Amplitude');
title('even signal');
subplot(2,1,2);
stem(t,r_odd)
xlabel('Time--->');
ylabel('Amplitude');
title('odd signal');

4b:
clc;
close all;
clear all;
n = 2;
 
r = [5, 6, 3, 4, 1];
 
t = -n:n; % Creates a time vector t from -n to n.
stem(t, r)
xlabel('Time--->');
ylabel('Amplitude');
title('Discrete time signal');
axis([-6 6 0 10])
 
len = length(r);
for i = 1:len
    r_even(i) = (1/2) * (r(i) + r(len-i+1)); % even = only r
    % It takes the average of the values at indices i and len-i+1 and stores it in r_even(i).
    r_odd(i) = (1/2) * (r(i) - r(len-i+1)); % odd = r + 1
    % It takes the difference of the values at indices i and len-i+1,
    % and then divides it by 2, storing the result in r_odd(i).
end
 
figure
subplot(2,1,1);
title('Even signal');
stem(t, r_even)
xlabel('Time--->');
ylabel('Amplitude');
title('Even signal');
 
subplot(2,1,2);
stem(t, r_odd)
xlabel('Time--->');
ylabel('Amplitude');
title('Odd signal');

lab5:
5a:
clc;
clear all;
close all;
A=2; 
f0 = 1000; 
phi =-pi/2;
T0 = 1/f0;
 
tt = 0 : T0/400 : 4*T0;
% All cosine functions are summed here
xx =(4*A/pi/1) *cos (2*pi*f0*tt + phi)+ (4*A/pi/3) *cos (2*pi*3*f0*tt + phi)+ (4*A/pi/5) *cos (2*pi*5*f0*tt + phi)+ (4*A/pi/7) *cos (2*pi*7*f0*tt + phi);
plot (tt, xx)
axis ([0,0.004,-4,4])
xlabel('Time (sec)'); 
grid on

5b:
clc;
clear all;
close all;
% Q.2.2 Square wave construction using Function, squarewave (N)
squarewave (100) % 1, 2, 10, 100
function squarewave (N)
A=2; 
f0=1000; 
phi=-pi/2;
T0=1/f0; 
x=0; 
t=0 : T0/40 : 4*T0;
for i=1:2:2*N-1
x=x+ ((4*A/pi/i) *cos ( (2*pi*i*f0*t+phi)));
end
 
plot (t, x); 
axis ([0,4*T0, -4,4])
xlabel('Time (sec)'); 
title('N=100, Sum of first 100 odd harmonics')
grid on
end

lab6:
% Q.2.4: Sawtooth wave construction using Function sawtooth (N) function sawtooth (N)
clc;
clear all;
close all;
sawtooth (200) % 1, 4, 20, 200
function sawtooth (N)
f0=1000; 
phi=-pi/2;
T0=1/f0;
t=0 : T0/40 : 4*T0; 
x=0;
for i=1:N
x=x+ ((T0/pi/i).*cos (2*pi*i*f0*t + phi));
end
plot (t,x); 
axis ([0,4*T0, -0.0006, 0.0006]);
xlabel('Time (sec)'); 
title('Sawtooth wave, N=200');
grid on
end


