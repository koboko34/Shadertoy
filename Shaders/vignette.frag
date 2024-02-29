void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy;
    uv -= 0.5;
    
    float d = length(uv);
    float mask = smoothstep(0.7, 0.4, d);

    vec3 col = vec3(1., 0., 0.) * mask;

    fragColor = vec4(col, 1.);
}