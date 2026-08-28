import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Boton from '../components/Boton';
import { CATEGORIAS } from '../data/pictogramas';
import type { RootStackParams } from '../navigation/types';
import { colores, espacio } from '../theme/estilos';

/**
 * PANTALLA 0 — Bienvenida
 *
 * Es lo primero que aparece al abrir la app. Cumple dos funciones:
 *
 *   1. Explicar en tres pasos cómo se usa. Quien acompaña a la persona
 *      (familia, terapeuta, profesor) suele abrir la app sin haberla visto
 *      antes, y necesita entenderla en cinco segundos.
 *
 *   2. Dar un punto de partida tranquilo. Entrar directamente a una
 *      cuadrícula llena de pictogramas puede sobrecargar a quien tiene
 *      hipersensibilidad sensorial.
 *
 * No guarda estado propio: solo muestra información y navega.
 */

type Props = NativeStackScreenProps<RootStackParams, 'Bienvenida'>;

const PASOS = [
  { numero: '1', texto: 'Toca los pictogramas que quieras decir' },
  { numero: '2', texto: 'Se van formando una frase en la barra de arriba' },
  { numero: '3', texto: 'Pulsa Hablar y el teléfono la dice en voz alta' },
];

export default function BienvenidaScreen({ navigation }: Props) {
  return (
    <View style={estilos.pantalla}>
      {/* --- Identidad --- */}
      <View style={estilos.cabecera}>
        <View style={estilos.fichas}>
          {CATEGORIAS.map((categoria) => (
            <View
              key={categoria.id}
              style={[estilos.ficha, { backgroundColor: categoria.color }]}
            >
              <Text style={estilos.simbolo}>{categoria.simbolo}</Text>
            </View>
          ))}
        </View>

        <Text style={estilos.titulo}>HablaConmigo</Text>
        <Text style={estilos.subtitulo}>
          Comunícate tocando pictogramas.{'\n'}El teléfono habla por ti.
        </Text>
      </View>

      {/* --- Cómo funciona --- */}
      <View style={estilos.pasos}>
        {PASOS.map((paso) => (
          <View key={paso.numero} style={estilos.paso}>
            <View style={estilos.circulo}>
              <Text style={estilos.numero}>{paso.numero}</Text>
            </View>
            <Text style={estilos.textoPaso}>{paso.texto}</Text>
          </View>
        ))}
      </View>

      {/* --- Entrada --- */}
      <View style={estilos.pie}>
        <Boton
          texto="Comenzar"
          icono="👉"
          tipo="secundario"
          // `replace` y no `navigate`: sustituye esta pantalla en lugar de
          // apilar otra encima. Así el botón atrás desde el tablero no
          // devuelve a la bienvenida, que ya no aporta nada.
          onPress={() => navigation.replace('Principal')}
        />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.principal,
    padding: espacio.lg,
    justifyContent: 'space-between',
  },
  cabecera: {
    alignItems: 'center',
    marginTop: espacio.lg,
  },
  fichas: {
    flexDirection: 'row',
    gap: espacio.sm,
    marginBottom: espacio.lg,
  },
  ficha: {
    width: 58,
    height: 58,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    // Borde claro para que las fichas se separen del fondo verde.
    borderWidth: 2,
    borderColor: colores.principalSuave,
  },
  simbolo: {
    fontSize: 28,
  },
  titulo: {
    fontSize: 36,
    fontWeight: '700',
    color: colores.textoClaro,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 17,
    color: colores.principalSuave,
    textAlign: 'center',
    marginTop: espacio.sm,
    lineHeight: 25,
  },
  pasos: {
    gap: espacio.md,
  },
  paso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.md,
  },
  circulo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colores.principalSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numero: {
    fontSize: 17,
    fontWeight: '700',
    color: colores.principal,
  },
  textoPaso: {
    flex: 1,
    fontSize: 16,
    color: colores.textoClaro,
    lineHeight: 22,
  },
  pie: {
    marginBottom: espacio.md,
  },
});
