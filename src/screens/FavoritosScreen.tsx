import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { useFrase } from '../context/FraseContext';
import { colores, espacio } from '../theme/estilos';

export default function FavoritosScreen() {
  const { favoritos, hablar, borrarFavorito } = useFrase();

  const confirmarBorrado = (id: string, texto: string) => {
    // Borrar no se puede deshacer, así que se pregunta antes.
    Alert.alert('Borrar frase', `¿Quitar "${texto}" de tus frases guardadas?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Borrar', style: 'destructive', onPress: () => borrarFavorito(id) },
    ]);
  };

  return (
    <View style={estilos.pantalla}>
      <FlatList
        data={favoritos}
        keyExtractor={(favorito) => favorito.id}
        contentContainerStyle={estilos.lista}
        renderItem={({ item }) => (
          <View style={estilos.tarjeta}>
            {/* Toda la zona de texto dice la frase: es la acción más
                frecuente, así que se le da el área táctil más grande. */}
            <Pressable
              onPress={() => hablar(item.texto)}
              style={({ pressed }) => [estilos.zonaTexto, pressed && estilos.pulsada]}
              accessibilityRole="button"
              accessibilityLabel={item.texto}
              accessibilityHint="Toca para decirla en voz alta"
            >
              <Text style={estilos.simbolos}>{item.simbolos}</Text>
              <Text style={estilos.texto}>{item.texto}</Text>
            </Pressable>

            <Pressable
              onPress={() => confirmarBorrado(item.id, item.texto)}
              style={estilos.borrar}
              accessibilityRole="button"
              accessibilityLabel={`Borrar ${item.texto}`}
            >
              <Text style={estilos.iconoBorrar}>🗑️</Text>
            </Pressable>
          </View>
        )}
        // Una pantalla en blanco no se distingue de una pantalla rota: por
        // eso se explica qué falta y cómo llenarla.
        ListEmptyComponent={
          <View style={estilos.vacio}>
            <Text style={estilos.simboloVacio}>⭐</Text>
            <Text style={estilos.tituloVacio}>Todavía no hay frases guardadas</Text>
            <Text style={estilos.mensajeVacio}>
              Forma una frase en el tablero y pulsa la estrella de la barra para
              guardarla aquí.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  lista: {
    padding: espacio.md,
    gap: espacio.sm,
    flexGrow: 1,
  },
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.sm,
    backgroundColor: colores.tarjeta,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: espacio.md,
  },
  zonaTexto: {
    flex: 1,
  },
  pulsada: {
    opacity: 0.6,
  },
  simbolos: {
    fontSize: 24,
  },
  texto: {
    fontSize: 16,
    fontWeight: '700',
    color: colores.texto,
    marginTop: espacio.xs,
  },
  borrar: {
    padding: espacio.sm,
  },
  iconoBorrar: {
    fontSize: 22,
  },
  vacio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: espacio.lg,
    gap: espacio.sm,
  },
  simboloVacio: {
    fontSize: 56,
  },
  tituloVacio: {
    fontSize: 19,
    fontWeight: '700',
    color: colores.texto,
    textAlign: 'center',
  },
  mensajeVacio: {
    fontSize: 15,
    color: colores.textoSuave,
    textAlign: 'center',
  },
});