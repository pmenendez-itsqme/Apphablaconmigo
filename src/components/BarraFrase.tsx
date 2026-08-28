import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useFrase } from '../context/FraseContext';
import { colores, espacio } from '../theme/estilos';
import Boton from './Boton';


export default function BarraFrase() {
  // Del contexto solo se toma lo que esta barra necesita.
  const { frase, vacia, quitarUltimo, limpiar, hablar, guardarFavorito } = useFrase();

  return (
    <View style={estilos.barra}>
      {/* Tira horizontal con los pictogramas elegidos */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={estilos.tira}
      >
        {vacia ? (
          <Text style={estilos.pista}>Toca los pictogramas para formar tu frase</Text>
        ) : (
          frase.map((pictograma, indice) => (
            // La clave combina el id y la posición porque el mismo
            // pictograma puede aparecer dos veces en la misma frase.
            <View key={`${pictograma.id}-${indice}`} style={estilos.ficha}>
              <Text style={estilos.simboloFicha}>{pictograma.simbolo}</Text>
              <Text style={estilos.textoFicha}>{pictograma.etiqueta}</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Botones de acción */}
      <View style={estilos.acciones}>
        <Pressable
          onPress={quitarUltimo}
          disabled={vacia}
          style={[estilos.botonPequeno, vacia && estilos.inactivo]}
          accessibilityRole="button"
          accessibilityLabel="Borrar el último pictograma"
        >
          <Text style={estilos.iconoPequeno}>⌫</Text>
        </Pressable>

        <Pressable
          onPress={limpiar}
          disabled={vacia}
          style={[estilos.botonPequeno, vacia && estilos.inactivo]}
          accessibilityRole="button"
          accessibilityLabel="Borrar toda la frase"
        >
          <Text style={estilos.iconoPequeno}>🗑️</Text>
        </Pressable>

        {/* El botón de hablar ocupa el espacio sobrante: es la acción
            principal de toda la app y debe ser la más fácil de acertar. */}
        <Boton
          texto="Hablar"
          icono="🔊"
          onPress={() => hablar()}
          desactivado={vacia}
          estilo={estilos.botonHablar}
        />

        <Pressable
          onPress={guardarFavorito}
          disabled={vacia}
          style={[estilos.botonPequeno, vacia && estilos.inactivo]}
          accessibilityRole="button"
          accessibilityLabel="Guardar la frase en favoritos"
        >
          <Text style={estilos.iconoPequeno}>⭐</Text>
        </Pressable>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  barra: {
    backgroundColor: colores.tarjeta,
    borderBottomWidth: 2,
    borderBottomColor: colores.borde,
    padding: espacio.sm,
    gap: espacio.sm,
  },
  tira: {
    alignItems: 'center',
    gap: espacio.xs,
    minHeight: 70,
  },
  pista: {
    color: colores.textoSuave,
    fontSize: 15,
    paddingHorizontal: espacio.sm,
  },
  ficha: {
    alignItems: 'center',
    backgroundColor: colores.principalSuave,
    borderWidth: 1,
    borderColor: colores.principal,
    borderRadius: 8,
    paddingHorizontal: espacio.sm,
    paddingVertical: espacio.xs,
    minWidth: 64,
  },
  simboloFicha: {
    fontSize: 28,
  },
  textoFicha: {
    fontSize: 12,
    fontWeight: '700',
    color: colores.texto,
  },
  acciones: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.sm,
  },
  botonPequeno: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colores.fondo,
    borderWidth: 2,
    borderColor: colores.borde,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactivo: {
    opacity: 0.4,
  },
  iconoPequeno: {
    fontSize: 22,
  },
  botonHablar: {
    flex: 1,
  },
});