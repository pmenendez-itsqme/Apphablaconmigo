import React from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { AREA_TACTIL, colores, espacio } from '../theme/estilos';

type Props = {
  texto: string;
  onPress: () => void;
  /** Emoji opcional a la izquierda del texto. */
  icono?: string;
  /** 'principal' relleno de color, 'secundario' solo con borde. */
  tipo?: 'principal' | 'secundario';
  desactivado?: boolean;
  estilo?: ViewStyle;
};

export default function Boton({
  texto,
  onPress,
  icono,
  tipo = 'principal',
  desactivado = false,
  estilo,
}: Props) {
  const esPrincipal = tipo === 'principal';

  return (
    <Pressable
      onPress={onPress}
      disabled={desactivado}
      style={({ pressed }) => [
        estilos.boton,
        esPrincipal ? estilos.principal : estilos.secundario,
        pressed && estilos.pulsado,
        desactivado && estilos.desactivado,
        estilo,
      ]}
      // Accesibilidad: quien use un lector de pantalla oirá esto.
      accessibilityRole="button"
      accessibilityLabel={texto}
      accessibilityState={{ disabled: desactivado }}
    >
      <View style={estilos.contenido}>
        {icono !== undefined && <Text style={estilos.icono}>{icono}</Text>}
        <Text
          style={[
            estilos.texto,
            { color: esPrincipal ? colores.textoClaro : colores.texto },
            desactivado && { color: colores.textoSuave },
          ]}
        >
          {texto}
        </Text>
      </View>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  boton: {
    minHeight: AREA_TACTIL,
    borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: espacio.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  principal: {
    backgroundColor: colores.principal,
    borderColor: colores.principalOscuro,
  },
  secundario: {
    backgroundColor: colores.tarjeta,
    borderColor: colores.borde,
  },
  pulsado: {
    opacity: 0.75,
  },
  desactivado: {
    backgroundColor: colores.borde,
    borderColor: colores.borde,
  },
  contenido: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.sm,
  },
  icono: {
    fontSize: 22,
  },
  texto: {
    fontSize: 18,
    fontWeight: '700',
  },
});