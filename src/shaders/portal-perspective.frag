/* precision mediump float; */

/* varying vec2 vTextureCoord; */
/* varying vec4 vColor; */

/* uniform sampler2D uSampler; */
/* uniform float gray; */

/* void main(void) { */
/*     gl_FragColor = texture2D(uSampler, vTextureCoord); */
/*     gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126 * gl_FragColor_r + 0.7152 * gl_FragColor.g + 0.0722 * gl_FragColor.b), gray); */
/* } */

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uRotation;
uniform vec4 filterArea;
uniform vec2 uDim;

vec2 mapCoord( vec2 coord ) {
    coord *= filterArea.xy;
    coord += filterArea.zw;

    return coord;
}

vec2 unmapCoord( vec2 coord ) {
    coord -= filterArea.zw;
    coord /= filterArea.xy;

    return coord;
}

void main(void) {

    vec2 texCoord = mapCoord(vTextureCoord) / uDim;

    /* vec2 center = vec2(0.085, 0.085); */
    vec2 center = vec2(0.5, 0.5);

    /* texCoord.y = 2.0 * (texCoord.y - center.y) + center.y; */

    mat2 rotationMat = mat2( cos(uRotation), -sin(uRotation),
                           sin(uRotation), cos(uRotation));
    vec2 rotCoord = rotationMat * (texCoord - center) + center;

    vec2 unmappedRotCoord = unmapCoord(rotCoord * uDim);
    vec2 unmappedTexCoord = unmapCoord(texCoord * uDim);

    vec4 texColor = texture2D(uSampler, unmappedTexCoord);
    /* texColor = texture2D(uSampler, vTextureCoord); */

    /* if (vTextureCoord.x < 0.08) { */
    /*     texColor = vec4(1.0, 0.0, 1.0, 1.0); */
    /* } */
    /* if (vTextureCoord.y < 0.02) { */
    /*     texColor = vec4(0.0, 1.0, 1.0, 1.0); */
    /* } */


    gl_FragColor = texColor;

}
